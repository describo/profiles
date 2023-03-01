# Profile Structure

- [Profile Structure](#profile-structure)
  - [Metadata](#metadata)
  - [Context](#context)
  - [Hide / Layouts](#hide--layouts)
  - [Classes](#classes)
  - [Lookup](#lookup)

The structure of a profile is as follows:

```
{
    "metadata": {
    },
    "context": {
    },
    "hide": {
    },
    "layouts": {
    },
    "classes": {
    },
    "lookup": {
    }
}
```

## Metadata

The metadata section is used to describe the profile. There are 4 properties you must provide:

-   `name`: A short name for this profile. This may be provided in the UI so it should make sense to
    a user.
-   `description`: A short description for this profile.
-   `version`: A version number.
-   `warnMissingProperty`: true or false: Whether or not the UI should warn when data is found in an
    RO-crate but a definition for is not found in the profile.
-   `keywords`: An array of keywords to enable lookups of this profile.

## Context

The context section allows you to provide a context for this profile. Although optional, it is
highly recommended that you provide a context that suits the profile you have created. Describo will
then disable the context editor and emit crates with this context in it.

See [All about contexts]('./contexts.md') for more information.

## Hide / Layouts

These sections define how to group properties into sections and which properties should be hidden
from the UI.

Each section is an object keyed on the name of the entity (e.g. Dataset) and the configuration for
how to deal with that entity when rendering the UI.

See [Hide and Layouts for a detailed account of these sections.](./hide-and-layouts.md)

## Classes

This section contains class definitions a user can use in their dataset description. The structure
is similar to the hide and layouts sections above where the key is the stringified `@type` and it
provides the definition of what can and can't be described to the UI.

See [Classes and Inputs for a detailed account of this section.](./classes-and-inputs.md)

## Lookup

This section defines datasources to be used as lookup endpoints for pre-described data. Consider a
country definition. Rather than asking a user to create an entity of type Country and define all the
relevant properties to adequately describe it, you could just provide a lookup to a pre defined
Country definition that they can inject into the crate.

See [Lookups for a detailed account of this section.](./lookup.md)
