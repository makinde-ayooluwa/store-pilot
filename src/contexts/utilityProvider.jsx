import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

export const UtilityContext = createContext();

export const UtilityProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [loadingCountries, setLoadingCountries] = useState(true);
    const [countryError, setCountryError] = useState(null);

    const getCountries = useCallback(async () => {
        try {
            setLoadingCountries(true);
            setCountryError(null);

            const response = await fetch(
                "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flags"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch countries");
            }

            const data = await response.json();

            const formattedCountries = data
                .map((country) => ({
                    name: country.name?.common || "",
                    code: country.cca2 || "",
                    code3: country.cca3 || "",
                    flag: country.flags?.svg || country.flags?.png || "",
                }))
                .filter((country) => country.name && country.code)
                .sort((a, b) => a.name.localeCompare(b.name));

            setCountries(formattedCountries);
        } catch (error) {
            console.error("GET COUNTRIES ERROR:", error);

            setCountryError(
                error.message || "Failed to load countries"
            );

            setCountries([]);
        } finally {
            setLoadingCountries(false);
        }
    }, []);

    useEffect(() => {
        getCountries();
    }, [getCountries]);

    const getCountry = useCallback(
        (code) => {
            if (!code) return null;

            return (
                countries.find(
                    (country) =>
                        country.code.toLowerCase() === code.toLowerCase()
                ) || null
            );
        },
        [countries]
    );

    const getCountryByName = useCallback(
        (name) => {
            if (!name) return null;

            return (
                countries.find(
                    (country) =>
                        country.name.toLowerCase() === name.toLowerCase()
                ) || null
            );
        },
        [countries]
    );

    return (
        <UtilityContext.Provider
            value={{
                countries,
                loadingCountries,
                countryError,
                getCountries,
                getCountry,
                getCountryByName,
            }}
        >
            {children}
        </UtilityContext.Provider>
    );
};

export const useUtility = () => {
    const context = useContext(UtilityContext);

    if (!context) {
        throw new Error(
            "useUtility must be used inside a UtilityProvider"
        );
    }

    return context;
};