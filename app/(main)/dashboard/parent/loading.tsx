import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 max-w-[1120px] mx-auto w-full gap-space-6">
      <div className="mb-space-2">
        <div className="h-10 bg-paper-100 dark:bg-night-900 animate-pulse rounded-radius-md w-1/3 mb-space-2" />
        <div className="h-5 bg-paper-100 dark:bg-night-900 animate-pulse rounded-radius-md w-1/2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-6">
        <Card radius="lg" className="col-span-1 lg:col-span-2">
          <CardHeader>
            <div className="h-6 bg-paper-100 dark:bg-night-900 animate-pulse rounded-radius-sm w-1/3" />
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-paper-100 dark:bg-night-900 animate-pulse rounded-radius-sm w-full mb-space-2" />
            <div className="h-4 bg-paper-100 dark:bg-night-900 animate-pulse rounded-radius-sm w-3/4" />
          </CardContent>
        </Card>

        <Card radius="md" className="col-span-1">
          <CardHeader>
            <div className="h-6 bg-paper-100 dark:bg-night-900 animate-pulse rounded-radius-sm w-1/2" />
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-paper-100 dark:bg-night-900 animate-pulse rounded-radius-sm w-full mb-space-4" />
            <div className="h-11 bg-paper-100 dark:bg-night-900 animate-pulse rounded-radius-sm w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
