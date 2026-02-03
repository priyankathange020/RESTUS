import { NextRequest, NextResponse } from 'next/server';
import { detectPhishingURL, detectPhishingEmail, detectPhishingFile } from '@/lib/phishing-detector';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { type, input, userId } = await request.json();

    let result;

    if (type === 'url') {
      result = detectPhishingURL(input);
    } else if (type === 'email') {
      result = detectPhishingEmail(input);
    } else if (type === 'file') {
      const { fileName, fileContent } = input;
      result = detectPhishingFile(fileName, fileContent);
    } else {
      return NextResponse.json({ error: 'Invalid detection type' }, { status: 400 });
    }

    // Save to database if user is logged in
    if (userId) {
      const { data, error } = await supabase
        .from('detection_results')
        .insert({
          user_id: userId,
          type,
          input: typeof input === 'string' ? input : input.fileName,
          result,
          created_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Database error:', error);
      }
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Detection error:', error);
    return NextResponse.json({ error: 'Detection failed' }, { status: 500 });
  }
}
