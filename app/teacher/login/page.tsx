import TeacherLogin from '@/components/teacher-login'

export const metadata = {
  title: 'Teacher Login'
}

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4">শিক্ষক / কর্মচারী লগইন</h1>
        <TeacherLogin />
      </div>
    </main>
  )
}
