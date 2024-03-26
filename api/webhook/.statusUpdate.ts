import supabase from '../db';
import { StatusUpdateMessageResponse, StatusUpdatePayload } from "../../types/vapi.types";

export const statusUpdateHandler = async (payload?: StatusUpdatePayload): Promise<StatusUpdateMessageResponse> => {
  if (!payload || !payload.status) {
    return {};
  }

  const { conversation_uuid, status } = payload;

  try {
    // Insert or update the call record
    const { data, error } = await supabase
      .from('calls')
      .upsert({ conversation_uuid, status })
      .single();

    if (error) {
      console.error('Error updating call status:', error);
    } else {
      console.log('Call status updated:', data);
    }
  } catch (error) {
    console.error('Error updating call status:', error);
  }

  return {};
};