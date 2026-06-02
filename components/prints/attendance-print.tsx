"use client"

import React from 'react'

export default function AttendancePrint({ title, rows }: { title?: string, rows: { name: string, status: string }[] }) {
  return (
    <div className="p-6 bg-white text-black print:p-0">
      <div className="text-center mb-6">
        <img src="/images/logo.png" alt="Logo" className="mx-auto w-24" />
        <h2 className="text-lg font-semibold">{title || 'Attendance Sheet'}</h2>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 text-left">Student</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="border p-2">{r.name}</td>
              <td className="border p-2">{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
