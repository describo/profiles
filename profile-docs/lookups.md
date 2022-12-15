- [Lookups](#lookups)

# Lookups

This section defines datasources to be used as lookup endpoints for pre-described data. Consider a
country definition. Rather than asking a user to create an entity of type Country and define all the
relevant properties to adequately describe it, you could just provide a lookup to a pre defined
Country definition that they can inject into the crate.

The overall structure of the lookup section is as follows:

```
"lookup": {
    "Language": {
        "fields": [
            "@id",
            "name",
            "alternateName",
            "iso639-3",
            "austlangCode",
            "glottologCode",
            "languageCode"
        ],
        "datapacks": [
            "https://raw.githubusercontent.com/describo/data-packs/master/data-packs/languages/glottolog-language-data-pack.json",
            "https://raw.githubusercontent.com/describo/data-packs/master/data-packs/languages/austlang-language-data-pack.json"
        ]
    }
}
```

The lookup object is keyed on the name of the Entity for which data lookups are required. In this
case we're definining lookups for entities of type Language.

Each lookup definition has two properties that are both required:

-   fields: an array of strings defining the properties on which to perform a lookup.
-   datapacks: an array of URL's to publically accessible data sources (JSON-LD) snippets to be used
    for the lookup.

Lookups are specific to the
[Crate Builder Component are described in that repository.](https://github.com/describo/crate-builder-component#configuration)
