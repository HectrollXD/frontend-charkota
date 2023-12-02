//---------------------------------------------------------------------------------------------------------------------- Imports
import { UserType } from "./enums";



//---------------------------------------------------------------------------------------------------------------------- Interfaces
//-------------------------------------------------------------------------------------------------- AnimalBreedData
export interface AnimalBreedData {
	id: string;
	breedName: string;
	family: AnimalFamilyData;
};

//-------------------------------------------------------------------------------------------------- AnimalFamilyData
export interface AnimalFamilyData {
	id: string;
	name: string;
	description: string;
};

//-------------------------------------------------------------------------------------------------- OwnerData
export interface OwnerData {
	id: string;
	name: string;
	lastname: string;
	phone: string;
	email: string;
	address: string;
};

//-------------------------------------------------------------------------------------------------- PersonData
export interface PersonData {
	id: string;
	name: string;
	lastname: string;
	phone: string;
	email: string;
};

//-------------------------------------------------------------------------------------------------- PetData
export interface PetData {
	id: string;
	name: string;
	birthDate: Date;
	animalBreed: AnimalBreedData;
	owner: OwnerData;
	vaccines: PetVaccineData[];
};

//-------------------------------------------------------------------------------------------------- PetVaccineData
export interface PetVaccineData {
	id: string;
	vaccineName: string;
	applicationDate: Date;
	dose: number;
};

//-------------------------------------------------------------------------------------------------- ProductData
export interface ProductData {
	id: string;
	barCode: string;
	name: string;
	description: string;
	price: number;
	qty: number;
	provider: ProviderData;
};

//-------------------------------------------------------------------------------------------------- ProductSaleData
export interface ProductSaleData {
	id: string;
	qty: number;
	unitaryPrice: number;
	totalPrice: number;
	product: ProductData;
};

//-------------------------------------------------------------------------------------------------- ProviderData
export interface ProviderData {
	id: string;
	name: string;
	rfc: string;
	phone: string;
	email: string;
};

//-------------------------------------------------------------------------------------------------- UserData
export interface UserData {
	id: string;
	email: string;
	username: string;
	person: PersonData;
	userType: UserType;
};
