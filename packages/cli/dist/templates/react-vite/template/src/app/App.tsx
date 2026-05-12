import { AppQueryClientProvider } from "./providers/query-client-provider";
import { HomePage } from "../pages/home/HomePage";

export function App() {
  return (
    <AppQueryClientProvider>
      <HomePage />
    </AppQueryClientProvider>
  );
}
