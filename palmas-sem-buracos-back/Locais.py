import pandas as pd
import requests
import json
from pathlib import Path

def scrape_geopalmas():
    ids_mapa = [14, 15, 16, 17, 18, 19]
    dfs = []

    for id_url in ids_mapa:
        url = f"http://geo.palmas.to.gov.br/mapas/getplacemarker/{id_url}/"

        try:
            response = requests.get(url, timeout=10)

            if response.status_code == 200:
                data = response.json()
                

                for item in data:
                    if "fields" in item:
                        df_item = pd.DataFrame([item["fields"]])
                        dfs.append(df_item)
            else:
                print(
                    f"Erro ao acessar ID {id_url}. Status code: {response.status_code}"
                )

        except Exception as e:
            print(f"Falha na requisição para o ID {id_url}: {e}")

    if dfs:
        selected_fields = ["id_place", "region", "name", "coordinate"]

        result_df = pd.concat(dfs, ignore_index=True)
        result_df = result_df[[col for col in selected_fields if col in result_df.columns]]

        output_path = Path(__file__).parent / "data" / "results.json"
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        result_df.to_json(output_path, orient="records", indent=4, force_ascii=False)
        
    else:
        print("\nNenhum dado pôde ser extraído.")


if __name__ == "__main__":
    scrape_geopalmas()
