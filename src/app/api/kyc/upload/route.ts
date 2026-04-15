import { createClient } from '@supabase/supabase-js'
import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET

if (!supabaseUrl || !supabaseServiceKey || !cloudinaryCloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
  throw new Error('Missing environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const userId = formData.get('userId') as string
    const documentType = formData.get('documentType') as string

    if (!file || !userId || !documentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'univibes/kyc',
          resource_type: 'auto',
          max_file_size: 5242880, // 5MB
          public_id: `${userId}-${documentType}`,
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      uploadStream.end(buffer)
    }) as any

    // Update user KYC document in Supabase
    const { error: updateError } = await supabase
      .from('users')
      .update({
        kyc_document_url: uploadResult.secure_url,
        kyc_status: 'submitted',
        kyc_document_type: documentType,
        kyc_submitted_at: new Date().toISOString(),
      })
      .eq('id', userId)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update KYC status' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'KYC document uploaded successfully',
      documentUrl: uploadResult.secure_url,
    })
  } catch (error) {
    console.error('KYC upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
