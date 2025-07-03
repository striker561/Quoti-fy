export interface IPLocation {
  country: string;
  regionName: string;
  city: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  query: string;
  status: "success" | "fail";
  [key: string]: unknown;
}

export async function getLocationByIP(ip: string): Promise<IPLocation | null> {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = (await res.json()) as IPLocation;

    if (data.status === "success") {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching IP location:", error);
    return null;
  }
}
