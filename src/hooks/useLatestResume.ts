import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { RESUME_BUCKET } from "@/constants/config";

export const useLatestResume = () => {
  return useQuery({
    queryKey: ["latest-resume"],
    queryFn: async () => {
      const { data, error } = await supabase.storage.from(RESUME_BUCKET).list("", {
        sortBy: { column: "created_at", order: "desc" },
      });

      if (error) throw error;

      const pdf = data?.find((f) => f.name.toLowerCase().endsWith(".pdf"));
      if (!pdf) return null;

      return supabase.storage.from(RESUME_BUCKET).getPublicUrl(pdf.name).data.publicUrl;
    },
    staleTime: 1000 * 60 * 10,
  });
};
