import { UrlService } from "@/services/url.service";
import { useQuery } from "@tanstack/react-query";

export function useUrlDetail(id: string) {
  return useQuery({
    queryKey: ["url", id],
    queryFn: () => UrlService.getUrlDetail(id),
    enabled: !!id,
  });
}
