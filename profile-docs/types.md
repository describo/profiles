-   [Text](#text)
-   [TextArea](#textarea)
-   [Number](#number)
-   [Date, DateTime, Time](#date-datetime-time)
-   [Geo](#geo)
-   [URL](#url)
-   [Select, SelectURL, SelectObject](#select-selecturl-selectobject)
-   [Value](#value)

The types property tells Describo what type of data can be provided for a property. It can be an
array of classes like `["Person", "Organisation"]` or simple data types like
`["Text", "Number", "Date"]`. It can also include the special `ANY` type to indicate that an entity
of any type can be attached at that location.

The simple data types you can define for a type are as follows:

## Text

-   `Text`: a simple text box

```JSON
{
    "id": "https://schema.org/name",
    "name": "name",
    ...
    "type": ["Text"]
},
```

## TextArea

-   `TextArea`: a simple text area box

```JSON
{
    "id": "https://schema.org/name",
    "name": "name",
    ...
    "type": ["TextArea"]
},
```

## Number

-   `Number`: A number input

```JSON
{
    "id": "https://schema.org/name",
    "name": "name",
    ...
    "type": ["Number"]
},
```

## Date, DateTime, Time

-   `Date`: A date input
-   `DateTime`: A date time input
-   `Time`: A time input

```JSON
{
    "id": "https://schema.org/name",
    "name": "name",
    ...
    "type": ["Date", "DateTime", "Time" ]
},
```

## Geo

-   `Geo`: A geo selection input; allows selecting an area or a single point

```JSON
{
    "id": "https://schema.org/name",
    "name": "name",
    ...
    "type": ["Geo"]
},
```

## URL

-   `URL`: Allows the user to input a URL

```JSON
{
    "id": "https://schema.org/name",
    "name": "name",
    ...
    "type": ["URL"]
},
```

Returns:

```
{ @id: ${URL}, @type: 'URL' }
```

Will report an error if the user types in something that doesn't look like a URL. Accepted protocols
are: 'http', 'https', 'ftp', 'ftps', 'arcp'.

## Select, SelectURL, SelectObject

-   `Select`: A control where the user can select from a number of predefined options:

```JSON
{
    ...
    "type": ["Select"],
    "values": [
        "Yes = in copyright",
        "No - out of copyright",
    ]
},
```

-   `SelectURL`: A control where the user can select from a number of predefined URLs and get back a
    URL object:

```JSON
{
    ...
    "type": ["SelectURL"],
    "values": [
        "http://schema.org",
    ]
},
```

-   `SelectObject`: A control where the user can select from a number of complete objects defined in
    the profile:

```JSON
{
    ...
    "type": ["SelectObject"],
    "values": [
       { "@id": "http://schema.org/Person", "@type": "rdfs:Class", name: 'Person', description: 'It's people!" },
       { "@id": "http://schema.org/Organization", "@type": "rdfs:Class", name: 'Organization', description: 'It's not people!" },
    ]
},
```

returns the selected object as defined and links it into the graph.

## Value

-   `Value`: A control where a specified value is set for a property

```JSON
{
    ...
    "type": "Value",
    "value": "red"
}
```
