import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }
  revalidatePath('/blog', 'page')
  revalidatePath('/blog/[slug]', 'page')
  return NextResponse.json({ revalidated: true })
}
// Register in Sanity project settings:
// https://innerloom.in/api/revalidate?secret=SANITY_REVALIDATE_SECRET