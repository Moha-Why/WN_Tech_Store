import { useState, useEffect } from "react";


export const useHardwareData = () => {
  const [cpuList, setCpuList] = useState([]);
  const [gpuList, setGpuList] = useState([]);
  const [isLoadingCPU, setIsLoadingCPU] = useState(true);
  const [isLoadingGPU, setIsLoadingGPU] = useState(true);

  useEffect(() => {
    const fetchCPUs = async () => {
      try {
        setIsLoadingCPU(true);
        // Using CPU-World API alternative - TechPowerUp CPU Database
        const response = await fetch('/api/revalidate?type=cpu');
        const res = await response.json();
        const cpus = res.data
        
        setCpuList(cpus);
      } catch (error) {
        console.error("Error fetching CPUs:", error);
      } finally {
        setIsLoadingCPU(false);
      }
    };

    const fetchGPUs = async () => {
      try {
        setIsLoadingGPU(true);
        const response = await fetch('/api/revalidate?type=gpu');
        const res = await response.json();
        const gpus = res.data
        
        setGpuList(gpus);
      } catch (error) {
        console.error("Error fetching GPUs:", error);
      } finally {
        setIsLoadingGPU(false);
      }
    };

    fetchCPUs();
    fetchGPUs();
  }, []);

  return { cpuList, gpuList, isLoadingCPU, isLoadingGPU };
};