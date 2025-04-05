export interface IPost {
    id: string;
    title: string;
    content: string;
    categories?: Array<{
      id: string;
      name: string;
    }>;
    createdAt: string;
  }