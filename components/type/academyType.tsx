export interface Academy {
  academyId: number;
  academyName: string;
  academyPhone: string;
  academyAddress: string;
  createdAt: string;
  academyImages: { url: string; name: string; type: string }[];
  mainImageUrl?: string;
}
