import supabase from '../db';
import { TranscriptMessageResponse, TranscriptPayload } from "../../types/vapi.types";

export const transcriptHandler = async (payload?: TranscriptPayload): Promise<TranscriptMessageResponse> => {
  if (!payload || !payload.transcript) {
    return {};
  }

  const { conversation_uuid, transcript } = payload;

  try {
    // Append the new transcript chunk to the existing transcript
    const { data, error } = await supabase
      .from('calls')
      .update({ transcript: `${data[0].transcript ?? ''}${transcript}` })
      .eq('conversation_uuid', conversation_uuid)
      .single();

    if (error) {
      console.error('Error updating transcript:', error);
    } else {
      console.log('Transcript updated:', data);
    }
  } catch (error) {
    console.error('Error updating transcript:', error);
  }

  return { transcript };
};