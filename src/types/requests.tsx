//---------------------------------------------------------------------------------------------------------------------- Imports
import { UserType } from "./enums";



//---------------------------------------------------------------------------------------------------------------------- Interfaces
//-------------------------------------------------------------------------------------------------- AnimalBreedRequest
export interface AnimalBreedRequest {
	breedName: string;
	animalFamilyId: string;
};

//-------------------------------------------------------------------------------------------------- AnimalFamilyRequest
export interface AnimalFamilyRequest {
	familyName: string;
	description: string;
};

//-------------------------------------------------------------------------------------------------- CreateMultipleAnimalBreedRequest
export interface CreateMultipleAnimalBreedRequest {
	animalBreedsList: AnimalBreedRequest[];
};

//-------------------------------------------------------------------------------------------------- CreateMultipleAnimalFamilyRequest
export interface CreateMultipleAnimalFamilyRequest {
	families: AnimalFamilyRequest[];
};

//-------------------------------------------------------------------------------------------------- CreateMultipleProviderRequest
export interface CreateMultipleProviderRequest {
	providers: ProviderRequest[];
};

//-------------------------------------------------------------------------------------------------- DeleteMultipleAnimalBreedsRequest
export interface DeleteMultipleAnimalBreedsRequest {
	animalBreedsIds: string[];
};

//-------------------------------------------------------------------------------------------------- DeleteMultipleAnimalFamilyRequest
export interface DeleteMultipleAnimalFamilyRequest {
	familiesId: string[];
};

//-------------------------------------------------------------------------------------------------- EditPetRequest
export interface EditPetRequest {
	name: string;
	birthDate: Date;
	vaccines: PetVaccineRequest[];
};

//-------------------------------------------------------------------------------------------------- OwnerRequest
export interface OwnerRequest {
	name: string;
	lastname: string;
	phone: string;
	email: string;
	address: string;
};

//-------------------------------------------------------------------------------------------------- PersonRequest
export interface PersonRequest {
	name: string;
	lastname: string;
	phone: string;
	email: string;
};

//-------------------------------------------------------------------------------------------------- PetRequest
export interface PetRequest {
	name: string;
	birthDate: Date;
	animalBreedId: string;
	ownerId: string;
	vaccines: PetVaccineRequest[];
};

//-------------------------------------------------------------------------------------------------- PetVaccineRequest
export interface PetVaccineRequest {
	vaccineName: string;
	applicationDate: Date;
	dose: number;
};

//-------------------------------------------------------------------------------------------------- ProductRequest
export interface ProductRequest {
	barCode: string;
	name: string;
	description: string;
	price: number;
	qty: number;
	providerId: string;
};

//-------------------------------------------------------------------------------------------------- ProductSaleRequest
export interface ProductSaleRequest {
	productId: string;
	qty: number;
	unitaryPrice: number;
	totalPrice: number;
};

//-------------------------------------------------------------------------------------------------- ProviderRequest
export interface ProviderRequest {
	name: string;
	rfc: string;
	phone: string;
	email: string;
};

//-------------------------------------------------------------------------------------------------- SellRequest
export interface SellRequest {
	userId: string;
	productsSales: ProductSaleRequest[];
};

//-------------------------------------------------------------------------------------------------- UserRequest
export interface UserRequest {
	email: string;
	username: string;
	password: string;
	personData: PersonRequest;
	userType: UserType;
};
