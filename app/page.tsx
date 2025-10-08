import { campersApi } from "@/services/campersApi";

export default async function Home() {


  const testCampers = await campersApi.getCampers({ limit: 2 });
  console.log('Test API response:', testCampers);

  return (
    <main>
      <h1>Travel Trecks - API works</h1>
      <p>Polucheno cemperov: {testCampers.length}</p>
    </main>
  )
}