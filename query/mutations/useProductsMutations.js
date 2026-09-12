// import { useMutation } from "@tanstack/react-query"
// import { ProductsService } from "../../services/Products.Service"
//! "برای این پروژه نیازی نبود"
// export const useCreateProduct = () => {
//     const qc = useQueryClient();

//     return useMutation ({
//         mutationFn:(data) => ProductsService.create(data),
//         onSuccess: () =>{
//             qc.invalidateQueries(["products"])
//         }
//     })
// }

// export const useUpdateProduct = () => {
//     const qc = useQueryClient();

//     return useMutation ({
//         mutationFn:({id,data}) => ProductsService.create(id,data),
//         onSuccess: () =>{
//             qc.invalidateQueries(["products"])
//         }
//     })
// }

// export const useDeleteProduct = () => {
//     const qc = useQueryClient();

//     return useMutation ({
//         mutationFn:(id) => ProductsService.create(id),
//         onSuccess: () =>{
//             qc.invalidateQueries(["products"])
//         }
//     })
// }