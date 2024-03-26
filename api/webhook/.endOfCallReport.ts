import supabase from '../db';
import { EndOfCallReportPayload } from "../../types/vapi.types";

export const endOfCallReportHandler = async (payload?: EndOfCallReportPayload): Promise<void> => {
  if (!payload) {
    return;
  }

  const { conversation_uuid, transcript } = payload;

  try {
    let data;
    const { error } = await supabase
      .from('calls')
      .update({ transcript, end_time: new Date() })
      .eq('conversation_uuid', conversation_uuid)
      .single()
      .then(response => {
        data = response.data;
      });

    if (error) {
      console.error('Error updating call record:', error);
    } else {
      console.log('Call record updated:', data);
    }
  } catch (error) {
    console.error('Error updating call record:', error);
  }
};