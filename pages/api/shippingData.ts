import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

type ShippingData = {
  name: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  date: string;
};

const filePath = path.join(process.cwd(), "data", "shippingData.json");

const readData = (): ShippingData[] => {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
    return [];
  }

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing JSON:", error);
    return [];
  }
};

const writeData = (data: ShippingData[]) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing JSON:", error);
  }
};

export const config = {
  api: {
    bodyParser: true, // Ensure body parser is enabled
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, lastName, phoneNumber, address, date } = req.body as ShippingData;

    if (!name || !lastName || !phoneNumber || !address || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const currentData = readData();
    const newData = { name, lastName, phoneNumber, address, date };
    currentData.push(newData);
    writeData(currentData);

    return res.status(201).json({ message: "Data saved successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
