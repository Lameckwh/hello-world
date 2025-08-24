import { NextResponse } from 'next/server';

export async function GET() {
  // Add dependency checks here if needed (e.g., database connection)
  return NextResponse.json({ status: 'healthy' }, { status: 200 });
  
}