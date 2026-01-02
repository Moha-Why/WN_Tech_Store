import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'cpu' or 'gpu'

  try {
    // You can add external API calls here if you find working ones
    // For now, return curated data
    
    const cpus = [
  // ===== Intel Core Ultra (Meteor Lake) =====
    "Intel Core Ultra 9 185H",
    "Intel Core Ultra 7 165H",
    "Intel Core Ultra 7 155H",
    "Intel Core Ultra 5 135H",

    // ===== Intel 14th / 13th / 12th Gen (H / HX / U) =====
    "Intel Core i9-14900HX",
    "Intel Core i7-14700HX",
    "Intel Core i7-13700H",
    "Intel Core i7-13620H",
    "Intel Core i7-12700H",
    "Intel Core i7-12650H",

    "Intel Core i5-13500H",
    "Intel Core i5-13420H",
    "Intel Core i5-12500H",
    "Intel Core i5-12450H",

    "Intel Core i7-1355U",
    "Intel Core i7-1255U",
    "Intel Core i5-1335U",
    "Intel Core i5-1235U",

    // ===== Intel 11th / 10th Gen =====
    "Intel Core i7-11800H",
    "Intel Core i7-1165G7",
    "Intel Core i5-11400H",
    "Intel Core i5-1135G7",

    "Intel Core i7-10750H",
    "Intel Core i7-1065G7",
    "Intel Core i5-10300H",
    "Intel Core i5-10210U",

    // ===== Intel 9th / 8th / 7th Gen =====
    "Intel Core i7-9750H",
    "Intel Core i7-8565U",
    "Intel Core i5-8300H",
    "Intel Core i5-8250U",

    "Intel Core i7-7700HQ",
    "Intel Core i5-7300HQ",
    "Intel Core i7-7500U",
    "Intel Core i5-7200U",

    // ===== AMD Ryzen 7000 / 8000 =====
    "AMD Ryzen 9 7945HX",
    "AMD Ryzen 9 7940HS",
    "AMD Ryzen 7 7840HS",
    "AMD Ryzen 7 7735HS",
    "AMD Ryzen 5 7640HS",
    "AMD Ryzen 5 7535HS",

    "AMD Ryzen 7 7840U",
    "AMD Ryzen 5 7640U",
    "AMD Ryzen 5 7540U",

    // ===== AMD Ryzen 6000 =====
    "AMD Ryzen 9 6980HX",
    "AMD Ryzen 9 6900HS",
    "AMD Ryzen 7 6800H",
    "AMD Ryzen 7 6800U",
    "AMD Ryzen 5 6600H",
    "AMD Ryzen 5 6600U",

    // ===== AMD Ryzen 5000 =====
    "AMD Ryzen 9 5980HX",
    "AMD Ryzen 9 5900HX",
    "AMD Ryzen 7 5800H",
    "AMD Ryzen 7 5700U",
    "AMD Ryzen 5 5600H",
    "AMD Ryzen 5 5500U",

    // ===== AMD Ryzen 4000 =====
    "AMD Ryzen 7 4800H",
    "AMD Ryzen 7 4700U",
    "AMD Ryzen 5 4600H",
    "AMD Ryzen 5 4500U",

    // ===== AMD Ryzen 3000 =====
    "AMD Ryzen 7 3750H",
    "AMD Ryzen 5 3550H",

    // ===== Apple Silicon (Laptop only) =====
    "Apple M4",
    "Apple M4 Pro",
    "Apple M4 Max",
    "Apple M3",
    "Apple M3 Pro",
    "Apple M3 Max",
    "Apple M2",
    "Apple M2 Pro",
    "Apple M2 Max",
    "Apple M1",
    "Apple M1 Pro",
    "Apple M1 Max",
    ].sort();


    const gpus = [
    // ===== NVIDIA RTX 40 Series =====
    "NVIDIA GeForce RTX 4090",
    "NVIDIA GeForce RTX 4080",
    "NVIDIA GeForce RTX 4070 Ti",
    "NVIDIA GeForce RTX 4070",
    "NVIDIA GeForce RTX 4060 Ti",
    "NVIDIA GeForce RTX 4060",

    // ===== NVIDIA RTX 30 Series =====
    "NVIDIA GeForce RTX 3090 Ti",
    "NVIDIA GeForce RTX 3090",
    "NVIDIA GeForce RTX 3080 Ti",
    "NVIDIA GeForce RTX 3080",
    "NVIDIA GeForce RTX 3070 Ti",
    "NVIDIA GeForce RTX 3070",
    "NVIDIA GeForce RTX 3060 Ti",
    "NVIDIA GeForce RTX 3060",

    // ===== NVIDIA RTX 20 Series =====
    "NVIDIA GeForce RTX 2080 Ti",
    "NVIDIA GeForce RTX 2080 Super",
    "NVIDIA GeForce RTX 2080",
    "NVIDIA GeForce RTX 2070 Super",
    "NVIDIA GeForce RTX 2070",
    "NVIDIA GeForce RTX 2060 Super",
    "NVIDIA GeForce RTX 2060",

    // ===== NVIDIA GTX 16 Series (still popular) =====
    "NVIDIA GeForce GTX 1660 Ti",
    "NVIDIA GeForce GTX 1660 Super",
    "NVIDIA GeForce GTX 1660",
    "NVIDIA GeForce GTX 1650 Super",
    "NVIDIA GeForce GTX 1650",

    // ===== NVIDIA GTX 10 Series (classics) =====
    "NVIDIA GeForce GTX 1080 Ti",
    "NVIDIA GeForce GTX 1080",
    "NVIDIA GeForce GTX 1070 Ti",
    "NVIDIA GeForce GTX 1070",
    "NVIDIA GeForce GTX 1060 6GB",

    // ===== NVIDIA Laptop GPUs =====
    "NVIDIA RTX 4090 Laptop",
    "NVIDIA RTX 4080 Laptop",
    "NVIDIA RTX 4070 Laptop",
    "NVIDIA RTX 4060 Laptop",
    "NVIDIA RTX 4050 Laptop",
    "NVIDIA RTX 3080 Ti Laptop",
    "NVIDIA RTX 3070 Ti Laptop",
    "NVIDIA RTX 3060 Laptop",
    "NVIDIA GTX 1660 Ti Laptop",

    // ===== AMD RX 7000 Series =====
    "AMD Radeon RX 7900 XTX",
    "AMD Radeon RX 7900 XT",
    "AMD Radeon RX 7800 XT",
    "AMD Radeon RX 7700 XT",
    "AMD Radeon RX 7600",

    // ===== AMD RX 6000 Series =====
    "AMD Radeon RX 6950 XT",
    "AMD Radeon RX 6900 XT",
    "AMD Radeon RX 6800 XT",
    "AMD Radeon RX 6800",
    "AMD Radeon RX 6700 XT",
    "AMD Radeon RX 6650 XT",
    "AMD Radeon RX 6600 XT",
    "AMD Radeon RX 6600",

    // ===== AMD RX 5000 Series =====
    "AMD Radeon RX 5700 XT",
    "AMD Radeon RX 5700",
    "AMD Radeon RX 5600 XT",
    "AMD Radeon RX 5500 XT",

    // ===== AMD RX 500 / 400 Series (classics) =====
    "AMD Radeon RX 590",
    "AMD Radeon RX 580",
    "AMD Radeon RX 570",
    "AMD Radeon RX 480",
    "AMD Radeon RX 470",

    // ===== AMD Laptop GPUs =====
    "AMD Radeon RX 7900M",
    "AMD Radeon RX 7800M",
    "AMD Radeon RX 7700S",
    "AMD Radeon RX 7600M XT",
    "AMD Radeon RX 7600M",
    "AMD Radeon RX 6800M",
    "AMD Radeon RX 6700M",

    // ===== Integrated / Common =====
    "Intel Iris Xe Graphics",
    "Intel UHD Graphics 770",
    "Intel UHD Graphics 730",
    "AMD Radeon Graphics (Integrated)",
    "Apple Integrated Graphics",
    ].sort();

    const data = type === 'cpu' ? cpus : type === 'gpu' ? gpus : [];

    return NextResponse.json({ data, success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch hardware data', success: false },
      { status: 500 }
    );
  }
}