export interface Academy {
  academyId: number;
  academyName: string;
  academyPhone: string;
  academyAddress: string;
  createdAt: string;
  images: { url: string; name: string; type: string }[];
  mainImageUrl?: string;
}
