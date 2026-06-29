import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import { redirect } from 'next/navigation'

const secret = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET!)

export async function requireAdmin() {
  const store = await cookies()
  const token = store.get('admin_token')?.value

  if (!token) redirect('/admin/login')

  try {
    await jwtVerify(token, secret)
  } catch {
    redirect('/admin/login')
  }
}
