import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "components";
import type { Route } from "./+types/CreateTrip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "lib/utils";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "lib/appwrite/client";
import { useNavigate } from "react-router";

export const loader = async () => {
  const response = await fetch("https://restcountries.com/v3.1/region/america");
  const data = await response.json();

  return data.map((country: any) => ({
    name: country.flag + country.name?.common,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMaps,
  }));
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];
  const navigate = useNavigate();

  const countriesData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const mapData = [
    {
      country: formData.country,
      color: "#EA3282E",
      coordinates:
        countries.find((country) => country.name === formData.country)
          ?.coordinates || [],
    },
  ];

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.groupType
    ) {
      setError("Please provide values for all fields");
      setLoading(false);
      return;
    }

    if (formData.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 and 10 days");
      setLoading(false);
      return;
    }

    // const user = await account.get();
    // if (!user.$id) {
    //   setError("User not authenticated");
    //   setLoading(false);
    //   return;
    // }

    try {
      const { budget, country, duration, groupType, interest, travelStyle } =
        formData;

      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: country,
          numberOfDays: duration,
          travelStyle: travelStyle,
          interests: interest,
          budget: budget,
          groupType: groupType,
        }),
      });

      const result = await response.json();

      console.log(result);

      if (result?.trip && result?.imageUrls) {
        window.localStorage.setItem(
          "trip",
          JSON.stringify({
            trip: { ...result.trip },
            imageUrls: result.imageUrls,
          })
        );

        navigate(`/trips/${result.id}`);
      } else {
        console.log("faile to generate trip");
      }
    } catch (error) {
      console.log("Error generating trip", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title={"Add new trip"}
        description={"View and edit AI generated travel plans"}
      />

      <section className="mt-2.5 wapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countriesData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select a country"
              className="combo-box"
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();

                e.updateData(
                  countries
                    .filter((country) =>
                      country.name.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      text: country.name,
                      value: country.value,
                    }))
                );
              }}
            />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder="Enter a number of days"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>

              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                className="combo-box"
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(key)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();

                  e.updateData(
                    comboBoxItems[key]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      }))
                  );
                }}
              />
            </div>
          ))}

          <div>
            <label htmlFor="location">Location on the world map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  dataSource={mapData}
                  shapeData={world_map}
                  shapeDataPath="country"
                  shapePropertyPath={"name"}
                  shapeSettings={{ colorValuePath: "color", fill: "#E5E5E5" }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className="bg-gray-200 h-px w-full"></div>

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          <footer className="px-6 w-full">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full"
              disabled={loading}
            >
              <img
                className={cn("size-5", { "animate-spin": loading })}
                src={`/assets/icons/${
                  loading ? "loader.svg" : "magic-star.svg"
                }`}
              />
              <span className="p-16-semibold text-white">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
