export interface Book{
  id: string;
  title: string;
  author: {
    fullName: string,
    id?: string
  };
  tags: [string];
}

export interface BookMetadata{
  title: string;
  author: {
    fullName: string
  };
  tags;
}
