export default async function Page({
  params,
}: {
  params: Promise<{ depId: string }>;
}) {
  const { depId } = await params;

  return <div>{depId}</div>;
}
