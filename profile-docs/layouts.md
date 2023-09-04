- [Layouts](#layouts)
  - [Layout selection for entities](#layout-selection-for-entities)
  - [Assigning properties to layout groups](#assigning-properties-to-layout-groups)

**This documentation is valid for the crate-builder-component from v0.40.0.**

The `layouts` section defines how to group properties.

# Layouts

The structure of the layouts section is as follows:

```
    "layouts": [
        {
            "appliesTo": ["Dataset"],
            "about": { "label": "About", "description": "" },
            "source": { "label": "Original Source Information", "description": "" },
            "who": { "label": "Who", "description": "" },
            "permissions": {
                "label": "Permissions",
                "description": ""
            },
            "overflow": {
                "label": "Other"
            }
        },
        {
            "appliesTo": ["Language"],
            "about": { "label": "About", "description": "" },
            "source": { "label": "More information", "description": "" },
            "overflow": {
                "label": "Other"
            }
        }
    ],
```

Layouts is an array of objects.

The keys (properties) cna be anything you want but some keys are special:
`appliesTo, about and overflow`. About is the tab where the entity `@id`, `@type` and `name` will be
shown. AppliesTo defines which entities this layout should be applied to. And overflow is where
properties in the data that are not defined in the profile will be shown.

In the example above we have two layouts.

1. The first layout applies to entities of type Dataset. It has 5 groups (about, source, who,
   permissions and overflow); each has a label and could have a description.
2. The second layout applies to entities of type Language. It has 3 groups (about, source and
   overflows); each has a label and could also have a description.

## Layout selection for entities

When describo loads an entity, it compares the entity `@type` as an array with the appliesTo array,
and, if there is any overlap, the layout will be applied. So, the first layout above would be
applied to the following entities:

```
@type = ['Dataset']
@type = ['Dataset', 'RepositoryCollection']
@type = ['RepositoryCollection', 'Dataset']
@type = ['Dataset', 'Organisation']
```

Note that the order of the `@type` array in the entity definition is not important.

If multiple layouts match (for example: `@type` = ['Dataset', 'Language']), then the first matching
layout will be applied (in this case layout 1).

## Assigning properties to layout groups

Adding properties to groups is done in the property definition. Consider a profile with the
following definition of a Dataset:

```
classes: {
   Dataset: {
       inputs: [
         {
            id: 'A'
            group: 'about',
         },
         {
            id: 'B''
            group: 'about',
         },
       ]
    }
}
```

In this example, both properties would be shown in the `about` tab and their order would be as
defined in the profile.
