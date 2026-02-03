import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { userId, detectionId, category, description } = await request.json();

    const { data, error } = await supabase
      .from('reports')
      .insert({
        user_id: userId,
        detection_id: detectionId,
        category,
        description,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Report error:', error);
    return NextResponse.json({ error: 'Report failed' }, { status: 500 });
  }
}
