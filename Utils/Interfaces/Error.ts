export interface ErrorProps {
  clearErr(): void;
  error: any;
}

export interface ErrorStateProps {
  isModalOpen: boolean;
  message: string;
}
