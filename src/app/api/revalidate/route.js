import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'cpu' or 'gpu'

  try {
    // You can add external API calls here if you find working ones
    // For now, return curated data
    
    const cpus = [
      // ==== Intel Mobile CPUs ====
      // ==== Pre-Core / Core Duo / Core 2 Duo era ====
      "Intel Pentium M 700",
      "Intel Pentium M 750",
      "Intel Celeron M 360",
      "Intel Celeron M 420",
      "Intel Core Duo T2050",
      "Intel Core Duo T2300",
      "Intel Core 2 Duo T5500",
      "Intel Core 2 Duo T5600",
      "Intel Core 2 Duo T7200",
      "Intel Core 2 Duo T7400",

      // ==== Intel Core i (1st Gen) Mobile - Arrandale / Clarksfield ====
      "Intel Core i3-330UM",
      "Intel Core i5-430UM",
      "Intel Core i5-520UM",
      "Intel Core i7-620M",
      "Intel Core i7-640M",
      "Intel Core i7-720QM",
      "Intel Core i7-740QM",

      // ==== Intel Core i (2nd Gen) Mobile - Sandy Bridge ====
      "Intel Core i3-2310M",
      "Intel Core i5-2410M",
      "Intel Core i5-2520M",
      "Intel Core i7-2630QM",
      "Intel Core i7-2720QM",

      // ==== Intel Core i (3rd Gen) Mobile - Ivy Bridge ====
      "Intel Core i3-3110M",
      "Intel Core i5-3210M",
      "Intel Core i5-3320M",
      "Intel Core i7-3520M",
      "Intel Core i7-3720QM",

      // ==== Intel Core i (4th Gen) Mobile - Haswell ====
      "Intel Core i3-4005U",
      "Intel Core i5-4200U",
      "Intel Core i5-4300U",
      "Intel Core i7-4600U",
      "Intel Core i7-4700HQ",
      "Intel Core i7-4850HQ",

      // ==== Intel Core i (5th Gen) Mobile - Broadwell ====
      "Intel Core i5-5200U",
      "Intel Core i5-5250U",
      "Intel Core i7-5500U",
      "Intel Core i7-5550U",
      "Intel Core i7-5775C",

      // ==== Intel Core i (6th Gen) Mobile - Skylake ====
      "Intel Core i5-6200U",
      "Intel Core i5-6300HQ",
      "Intel Core i7-6500U",
      "Intel Core i7-6700HQ",

      // ==== Intel Core i (7th Gen) Mobile - Kaby Lake ====
      "Intel Core i5-7200U",
      "Intel Core i5-7300HQ",
      "Intel Core i7-7500U",
      "Intel Core i7-7700HQ",

      // ==== Intel Core i (8th Gen) Mobile - Kaby Lake Refresh / Coffee Lake ====
      "Intel Core i5-8250U",
      "Intel Core i5-8300H",
      "Intel Core i7-8550U",
      "Intel Core i7-8750H",

      // ==== Intel Core i (9th Gen) Mobile - Coffee Lake Refresh ====
      "Intel Core i5-9300H",
      "Intel Core i7-9750H",
      "Intel Core i9-9880H",
      "Intel Core i9-9980HK",

      // ==== Intel Core i (10th Gen) Mobile - Comet Lake / Ice Lake ====
      "Intel Core i5-1035G1",
      "Intel Core i5-10400H",
      "Intel Core i7-1065G7",
      "Intel Core i7-10750H",
      "Intel Core i9-10980HK",

      // ==== Intel Core i (11th Gen) Mobile - Tiger Lake ====
      "Intel Core i5-1135G7",
      "Intel Core i5-11400H",
      "Intel Core i7-1165G7",
      "Intel Core i7-11800H",
      "Intel Core i9-11980HK",

      // ==== Intel Core i (12th Gen) Mobile - Alder Lake ====
      "Intel Core i5-1240P",
      "Intel Core i5-12500H",
      "Intel Core i7-1260P",
      "Intel Core i7-12650H",
      "Intel Core i9-12900HK",

      // ==== Intel Core i (13th Gen) Mobile - Raptor Lake ====
      "Intel Core i5-13420H",
      "Intel Core i5-13500H",
      "Intel Core i7-13700H",
      "Intel Core i7-13720H",
      "Intel Core i9-13900HX",

      // ==== Intel Core Ultra / 14th Gen - Meteor Lake / Ultra ====
      "Intel Core Ultra 5 135H",
      "Intel Core Ultra 7 155H",
      "Intel Core Ultra 7 165H",
      "Intel Core Ultra 7 255U",
      "Intel Core Ultra 9 185H",
      "Intel Core Ultra 9 295U",

      // ==== AMD Laptop CPUs ====
      // Pre-Ryzen / Athlon / Turion Mobile
      "AMD Turion 64 Mobile",
      "AMD Athlon 64 Mobile",
      "AMD Athlon II P320",
      "AMD Athlon II P340",

      // Ryzen 2000 / 3000 Series Mobile
      "AMD Ryzen 3 2200U",
      "AMD Ryzen 3 2300U",
      "AMD Ryzen 5 2500U",
      "AMD Ryzen 5 3500U",
      "AMD Ryzen 7 3700U",

      // Ryzen 4000 Series (Zen 2 Mobile)
      "AMD Ryzen 5 4500U",
      "AMD Ryzen 5 4600H",
      "AMD Ryzen 7 4700U",
      "AMD Ryzen 7 4800H",

      // Ryzen 5000 Series (Zen 3 Mobile)
      "AMD Ryzen 5 5500U",
      "AMD Ryzen 5 5600H",
      "AMD Ryzen 7 5700U",
      "AMD Ryzen 7 5800H",
      "AMD Ryzen 9 5900HX",
      "AMD Ryzen 9 5980HX",

      // Ryzen 6000 Series (Zen 3+ Mobile)
      "AMD Ryzen 5 6600U",
      "AMD Ryzen 5 6600H",
      "AMD Ryzen 7 6800U",
      "AMD Ryzen 7 6800H",
      "AMD Ryzen 9 6900HS",
      "AMD Ryzen 9 6980HX",

      // Ryzen 7000 Series (Zen 4 Mobile)
      "AMD Ryzen 5 7540U",
      "AMD Ryzen 5 7640U",
      "AMD Ryzen 7 7840U",
      "AMD Ryzen 7 7840HS",
      "AMD Ryzen 9 7940HS",
      "AMD Ryzen 9 7945HX",

      // ==== Apple Silicon Laptop CPUs ====
      "Apple M1",
      "Apple M1 Pro",
      "Apple M1 Max",
      "Apple M2",
      "Apple M2 Pro",
      "Apple M2 Max",
      "Apple M3",
      "Apple M3 Pro",
      "Apple M3 Max",
      "Apple M4",
      "Apple M4 Pro",
      "Apple M4 Max",

      // ==== Qualcomm / ARM Laptop CPUs ====
      "Qualcomm Snapdragon 8cx Gen 3",
      "Qualcomm Snapdragon X Elite",
      "Qualcomm Snapdragon X2 Elite",
      "Qualcomm Snapdragon X2 Elite Extreme",
    ].sort();


    const gpus = [
      // ==== NVIDIA Laptop GPUs (Classic) ====
      "NVIDIA GeForce 8800M GTX",
      "NVIDIA GeForce 8700M GT",
      "NVIDIA GeForce 8600M GT",
      "NVIDIA GeForce 9400M",
      "NVIDIA GeForce 9600M GT",
      "NVIDIA GeForce 9800M GS",

      // ==== NVIDIA GTX 10 Series Laptop (Pascal) ====
      "NVIDIA GeForce GTX 1050 Laptop",
      "NVIDIA GeForce GTX 1050 Ti Laptop",
      "NVIDIA GeForce GTX 1060 Laptop",
      "NVIDIA GeForce GTX 1070 Laptop",
      "NVIDIA GeForce GTX 1080 Laptop",

      // ==== NVIDIA RTX 20 Series Laptop (Turing) ====
      "NVIDIA GeForce RTX 2060 Laptop",
      "NVIDIA GeForce RTX 2060 Super Laptop",
      "NVIDIA GeForce RTX 2070 Laptop",
      "NVIDIA GeForce RTX 2070 Super Laptop",
      "NVIDIA GeForce RTX 2080 Laptop",
      "NVIDIA GeForce RTX 2080 Super Laptop",
      "NVIDIA GeForce RTX 2080 Ti Laptop",

      // ==== NVIDIA RTX 30 Series Laptop (Ampere) ====
      "NVIDIA GeForce RTX 3050 Laptop",
      "NVIDIA GeForce RTX 3050 Ti Laptop",
      "NVIDIA GeForce RTX 3060 Laptop",
      "NVIDIA GeForce RTX 3060 Ti Laptop",
      "NVIDIA GeForce RTX 3070 Laptop",
      "NVIDIA GeForce RTX 3070 Ti Laptop",
      "NVIDIA GeForce RTX 3080 Laptop",
      "NVIDIA GeForce RTX 3080 Ti Laptop",
      "NVIDIA GeForce RTX 3090 Laptop",
      "NVIDIA GeForce RTX 3090 Ti Laptop",

      // ==== NVIDIA RTX 40 Series Laptop (Ada Lovelace) ====
      "NVIDIA GeForce RTX 4050 Laptop",
      "NVIDIA GeForce RTX 4060 Laptop",
      "NVIDIA GeForce RTX 4060 Ti Laptop",
      "NVIDIA GeForce RTX 4070 Laptop",
      "NVIDIA GeForce RTX 4070 Ti Laptop",
      "NVIDIA GeForce RTX 4080 Laptop",
      "NVIDIA GeForce RTX 4090 Laptop",

      // ==== AMD Radeon Laptop GPUs (Classic) ====
      "AMD Radeon HD 6310M",
      "AMD Radeon HD 6770M",
      "AMD Radeon HD 6970M",
      "AMD Radeon R7 M260",
      "AMD Radeon R9 M375",
      "AMD Radeon Vega 3 Mobile",
      "AMD Radeon Vega 6 Mobile",
      "AMD Radeon Vega 8 Mobile",
      "AMD Radeon Vega 10 Mobile",

      // ==== AMD RX 400 / 500 Laptop ====
      "AMD Radeon RX 460M",
      "AMD Radeon RX 470M",
      "AMD Radeon RX 480M",
      "AMD Radeon RX 550M",
      "AMD Radeon RX 560M",
      "AMD Radeon RX 570M",
      "AMD Radeon RX 580M",

      // ==== AMD RX 5000 Series Laptop (Navi) ====
      "AMD Radeon RX 5300M",
      "AMD Radeon RX 5500M",
      "AMD Radeon RX 5600M",
      "AMD Radeon RX 5700M",
      "AMD Radeon RX 5700 XT Mobile",

      // ==== AMD RX 6000 Series Laptop (RDNA2) ====
      "AMD Radeon RX 6600M",
      "AMD Radeon RX 6650M",
      "AMD Radeon RX 6700M",
      "AMD Radeon RX 6800M",
      "AMD Radeon RX 6800M XT",
      "AMD Radeon RX 6900M",
      "AMD Radeon RX 6950M",

      // ==== AMD RX 7000 Series Laptop (RDNA3) ====
      "AMD Radeon RX 7600M",
      "AMD Radeon RX 7600M XT",
      "AMD Radeon RX 7700S",
      "AMD Radeon RX 7800M",
      "AMD Radeon RX 7900M",

      // ==== Intel Integrated Graphics ====
      "Intel HD Graphics 2000",
      "Intel HD Graphics 3000",
      "Intel HD Graphics 4000",
      "Intel HD Graphics 5000",
      "Intel UHD Graphics 600",
      "Intel UHD Graphics 610",
      "Intel UHD Graphics 620",
      "Intel Iris Plus Graphics",
      "Intel Iris Xe Graphics",
      "Intel Iris Xe Max",

      // ==== AMD Integrated Graphics ====
      "AMD Radeon Vega 3 (Integrated)",
      "AMD Radeon Vega 6 (Integrated)",
      "AMD Radeon Vega 8 (Integrated)",

      // ==== Apple Integrated Graphics ====
      "Apple M1 Integrated",
      "Apple M1 Pro Integrated",
      "Apple M1 Max Integrated",
      "Apple M2 Integrated",
      "Apple M2 Pro Integrated",
      "Apple M2 Max Integrated",
      "Apple M3 Integrated",
      "Apple M3 Pro Integrated",
      "Apple M3 Max Integrated",
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