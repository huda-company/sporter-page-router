export type PageItem = {
  page: number;
  limit: number;
};

export type Pagination = {
  next?: PageItem;
  prev?: PageItem;
};

export type ApiResponse = {
  data?: any;
  rawData?: any;
  success: boolean;
  count?: number;
  pagination?: Pagination;
  message?: string;
  error?: any;
  stack?: string;
  lastUpdated?: Date;
  cursor?: string;
  has_more?: boolean;
};
