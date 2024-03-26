import supabase from '../db';
import { StatusUpdateMessageResponse, StatusUpdatePayload } from "../../types/vapi.types";

export const statusUpdateHandler = async (payload?: StatusUpdatePayload): Promise<StatusUpdateMessageResponse> => {
  if (!payload || !payload.status) {
    return {};
  }

  const { conversation_uuid, status } = payload;

  try {
    let data;
    const { error } = await supabase
      .from('calls')
      .upsert({ conversation_uuid, status })
      .single()
      .then(response => {
        data = response.data;
      });

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