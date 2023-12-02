//---------------------------------------------------------------------------------------------------------------------- Imports
import { AnimalBreedData, AnimalFamilyData, OwnerData, PetData, ProductData, ProductSaleData, ProviderData, UserData } from "./data";



//---------------------------------------------------------------------------------------------------------------------- Interfaces
//-------------------------------------------------------------------------------------------------- AnimalBreedResponse
export interface AnimalBreedResponse {
	animals: AnimalBreedData[];
};

//-------------------------------------------------------------------------------------------------- AnimalFamilyResponse
export interface AnimalFamilyResponse {
	families: AnimalFamilyData[];
};

//-------------------------------------------------------------------------------------------------- GenericResponse
export interface GenericResponse<T> {
	status: boolean;
	message: string;
	data: T;
};

//-------------------------------------------------------------------------------------------------- OwnerResponse
export interface OwnerResponse {
	owners: OwnerData[];
};

//-------------------------------------------------------------------------------------------------- PetResponse
export interface PetResponse {
	pets: PetData[];
};

//-------------------------------------------------------------------------------------------------- ProductResponse
export interface ProductResponse {
	products: ProductData[];
};

//-------------------------------------------------------------------------------------------------- ProviderResponse
export interface ProviderResponse {
	providers: ProviderData[];
};

//-------------------------------------------------------------------------------------------------- SellResponse
export interface SellResponse {
	sellId: string;
	total: number;
	productSales: ProductSaleData[];
};

//-------------------------------------------------------------------------------------------------- UserResponse
export interface UserResponse {
	users: UserData[];
};
