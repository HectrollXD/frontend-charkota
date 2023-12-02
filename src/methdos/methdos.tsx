//---------------------------------------------------------------------------------------------------------------------- Imports
import axios, { AxiosError, AxiosResponse } from "axios";
import vars from "../vars";
import {
	AnimalBreedResponse, AnimalFamilyResponse, GenericResponse, OwnerResponse, PetResponse,
	ProductResponse, ProviderResponse, SellResponse, UserResponse
} from "../types/respones";
import {
	CreateMultipleAnimalBreedRequest, CreateMultipleAnimalFamilyRequest,
	CreateMultipleProviderRequest, DeleteMultipleAnimalBreedsRequest,
	DeleteMultipleAnimalFamilyRequest, EditPetRequest, OwnerRequest, PetRequest, ProductRequest,
	SellRequest, UserRequest
} from "../types/requests";
import {
	AnimalBreedData, AnimalFamilyData, OwnerData, PetData, ProductData, UserData
} from "../types/data";



//---------------------------------------------------------------------------------------------------------------------- Instances
const instance = axios.create();
instance.interceptors.request.use((config) => {
	config.baseURL = vars.baseURL;

	/* const headers: AxiosHeaders = new AxiosHeaders({
		autorization: `Bearer ${}`
	}); */
	//config.headers = headers;

	return config;
});



//---------------------------------------------------------------------------------------------------------------------- Animals
//-------------------------------------------------------------------------------------------------- Post families
export const createMultipleFamiliest = (
	body: CreateMultipleAnimalFamilyRequest
): Promise<GenericResponse<AnimalFamilyResponse>> =>
new Promise<GenericResponse<AnimalFamilyResponse>>((resolve, reject) => {
	const path = "/animals/families";
	return instance.post(path, body)
		.then((respone: AxiosResponse<GenericResponse<AnimalFamilyResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Get families
export const getAllAnimalFamilies = (
): Promise<GenericResponse<AnimalFamilyData>> =>
new Promise<GenericResponse<AnimalFamilyData>>((resolve, reject) => {
	const path = "/animals/families";
	return instance.get(path)
		.then((respone: AxiosResponse<GenericResponse<AnimalFamilyData>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Delete families
export const deleteMultipleAnimalFamilies = (
	body: DeleteMultipleAnimalFamilyRequest
): Promise<GenericResponse<AnimalFamilyData[]>> =>
new Promise<GenericResponse<AnimalFamilyData[]>>((resolve, reject) => {
	const path = "/animals/families";
	return instance.delete(path, {data: body})
		.then((respone: AxiosResponse<GenericResponse<AnimalFamilyData[]>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Post breeds
export const createMultipleBreeds = (
	body: CreateMultipleAnimalBreedRequest
): Promise<GenericResponse<AnimalBreedResponse>> =>
new Promise<GenericResponse<AnimalBreedResponse>>((resolve, reject) => {
	const path = "/animals/breeds";
	return instance.post(path, body)
		.then((respone: AxiosResponse<GenericResponse<AnimalBreedResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Get Breeds
export const getAllAnimalsBreeds = (
	familyId?: string
): Promise<GenericResponse<AnimalBreedData[]>> =>
new Promise<GenericResponse<AnimalBreedData[]>>((resolve, reject) => {
	const path = "/animals/breeds";
	return instance.get(path, {params: {familyId: familyId}})
		.then((respone: AxiosResponse<GenericResponse<AnimalBreedData[]>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Delete Breeds
export const deleteMultipleAnimalBreeds = (
	body: DeleteMultipleAnimalBreedsRequest
): Promise<GenericResponse<never>> =>
new Promise<GenericResponse<never>>((resolve, reject) => {
	const path = "/animals/breeds";
	return instance.delete(path, {data: body})
		.then((respone: AxiosResponse<GenericResponse<never>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//---------------------------------------------------------------------------------------------------------------------- Dates
//---------------------------------------------------------------------------------------------------------------------- Owners
//-------------------------------------------------------------------------------------------------- Post owners
export const createOwner = (
	body: OwnerRequest
): Promise<GenericResponse<OwnerData>> =>
new Promise<GenericResponse<OwnerData>>((resolve, reject) => {
	const path = "/owners";
	return instance.post(path, body)
		.then((respone: AxiosResponse<GenericResponse<OwnerData>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Put ownres
export const editOwner = (
	ownerId: string, body: OwnerRequest
): Promise<GenericResponse<OwnerData>> =>
new Promise<GenericResponse<OwnerData>>((resolve, reject) => {
	const path = "/owners/" + ownerId;
	return instance.put(path, body)
		.then((respone: AxiosResponse<GenericResponse<OwnerData>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Get owners
export const getOwnersData = (
	ownerId?: string, name?: string
): Promise<GenericResponse<OwnerResponse>> =>
new Promise<GenericResponse<OwnerResponse>>((resolve, reject) => {
	const path = "/owners";
	return instance.get(path, {params: {ownerId: ownerId, name: name}})
		.then((respone: AxiosResponse<GenericResponse<OwnerResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//---------------------------------------------------------------------------------------------------------------------- Pets
//-------------------------------------------------------------------------------------------------- Get pets
export const getAllPets = (
	petId?: string, name?: string
): Promise<GenericResponse<PetResponse>> =>
new Promise<GenericResponse<PetResponse>>((resolve, reject) => {
	const path = "/pets";
	return instance.get(path, {params: {petId: petId, name: name}})
		.then((respone: AxiosResponse<GenericResponse<PetResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Post pets
export const createPet = (
	body: PetRequest
): Promise<GenericResponse<PetData>> =>
new Promise<GenericResponse<PetData>>((resolve, reject) => {
	const path = "/pets";
	return instance.post(path, body)
		.then((respone: AxiosResponse<GenericResponse<PetData>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Put pets
export const editPet = (
	petID: string, body: EditPetRequest
): Promise<GenericResponse<PetData>> =>
new Promise<GenericResponse<PetData>>((resolve, reject) => {
	const path = "/pets/" + petID;
	return instance.put(path, body)
		.then((respone: AxiosResponse<GenericResponse<PetData>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//---------------------------------------------------------------------------------------------------------------------- Products
//-------------------------------------------------------------------------------------------------- Get products
export const getProducts = (
	productId?: string, name?: string, barCode?: string
): Promise<GenericResponse<ProductResponse>> =>
new Promise<GenericResponse<ProductResponse>>((resolve, reject) => {
	const path = "/products";
	return instance.get(path, {params: {productId: productId, name: name, barCode: barCode}})
		.then((respone: AxiosResponse<GenericResponse<ProductResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Post products
export const createProducts = (
	body: ProductRequest
): Promise<GenericResponse<ProductData>> =>
new Promise<GenericResponse<ProductData>>((resolve, reject) => {
	const path = "/products";
	return instance.post(path, body)
		.then((respone: AxiosResponse<GenericResponse<ProductData>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Put product
export const editProduct = (
	productId: string, body: ProductRequest
): Promise<GenericResponse<ProductData>> =>
new Promise<GenericResponse<ProductData>>((resolve, reject) => {
	const path = "/products/"+ productId;
	return instance.put(path, body)
		.then((respone: AxiosResponse<GenericResponse<ProductData>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Delete product
export const deleteProduct = (
	productId: string
): Promise<GenericResponse<never>> =>
new Promise<GenericResponse<never>>((resolve, reject) => {
	const path = "/products/" + productId;
	return instance.delete(path)
		.then((respone: AxiosResponse<GenericResponse<never>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//---------------------------------------------------------------------------------------------------------------------- Providers
//-------------------------------------------------------------------------------------------------- Post provider
export const createMultipleProviders = (
	body: CreateMultipleProviderRequest
): Promise<GenericResponse<ProviderResponse>> =>
new Promise<GenericResponse<ProviderResponse>>((resolve, reject) => {
	const path = "/providers";
	return instance.post(path, body)
		.then((respone: AxiosResponse<GenericResponse<ProviderResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Get providers
export const getAllProviders = (
	providerId?: string, providerName?: string
): Promise<GenericResponse<ProviderResponse>> =>
new Promise<GenericResponse<ProviderResponse>>((resolve, reject) => {
	const path = "/providers";
	return instance.get(path, {params: {providerId: providerId, providerName: providerName}})
		.then((respone: AxiosResponse<GenericResponse<ProviderResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//---------------------------------------------------------------------------------------------------------------------- Sales
//-------------------------------------------------------------------------------------------------- Post sale
export const createNewSell = (
	body: SellRequest
): Promise<GenericResponse<SellResponse>> =>
new Promise<GenericResponse<SellResponse>>((resolve, reject) => {
	const path = "/sales";
	return instance.post(path, body)
		.then((respone: AxiosResponse<GenericResponse<SellResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//---------------------------------------------------------------------------------------------------------------------- Users
//-------------------------------------------------------------------------------------------------- Get users
export const getUsersData = (
	userId?: string, username?: string,
): Promise<GenericResponse<UserResponse>> =>
new Promise<GenericResponse<UserResponse>>((resolve, reject) => {
	const path = "/users";
	return instance.get(path, {params: {userId: userId, username: username}})
		.then((respone: AxiosResponse<GenericResponse<UserResponse>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});

//-------------------------------------------------------------------------------------------------- Post users
export const fntPost = (
	body: UserRequest
): Promise<GenericResponse<UserData>> =>
new Promise<GenericResponse<UserData>>((resolve, reject) => {
	const path = "/users";
	return instance.post(path, body)
		.then((respone: AxiosResponse<GenericResponse<UserData>>) => (
			resolve(respone.data)
		)).catch((error: AxiosError) => (
			reject(error)
		));
});
