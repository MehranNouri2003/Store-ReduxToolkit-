"use client";
import { useQuery } from "@tanstack/react-query";
import { ProductsService } from "../../services/Products.Service";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: ProductsService.getAll,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
export const useProductsDetails = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: ProductsService.getOne,
  });
};
