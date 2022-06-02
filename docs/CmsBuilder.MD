# Cms builder / Form builder

The cms builder is a component which i added to simplify the process of making forms and pushing data to the api. All the forms are going to have the same style so it was only logical that when this application was going to use tens if not hundreds of forms that i made some kind og generating form.

Im using the word CMS in this whole documentation. CMS stands for Content management system which this form builder is not alone. In my case it comes with an api so it becomes a CMS system but alone this is NOT a CMS.

!Note see [submit](CmsBuilder.MD#submit) for the form to handle the post request

The Cms also uses axios and you have to set a default baseUrl. If you don't know how to do this you can follow [this tutorial](https://axios-http.com/docs/config_defaults)

## Links

- [Examples](CmsBuilder.md#examples)
- [Types](CmsBuilder.md#types)
  - [ICmsType](CmsBuilder.MD#icms)

The Cms builder is based around the idea that you should be able to write as little code as possible to generate i good and structured form which handles the following by itself if given the right values:

- Creating fields such as inputfield, textfield, selectbox etc from as minimum data as possible
- Formatting data forth and back so the developer can easily work with the data that the form generates
- Handling data change in an effective way
- Giving proper errors for an easier time debugging
- Give the user feedback if something fails or succeeds
- Open for fully customization from the developers perspective


## Examples

Here you can find multiple examples on how to use the `<Cms />` component

### Basic usage
```tsx
<Cms
                title="Create new project"
                submit={{
                    endpoint: "/limeyfy/project"
                }}
                props={[
                    {
                        name: "title",
                        type: "string",
                        options: {
                            placeholder: "Project title"
                        }
                    },
                    {
                        name: "description",
                        type: "text",
                        options: {
                            placeholder: "..."
                        }
                    },
                ]}
            />
```

## Types 
Types with a question mark after it is optional but its necessary for certain functionality which is described underneath it, 

### ICms

The `<Cms />` component has these types:

#### `title`?
Title is of type string. Title is the title that will appear on top of the cms this is optional but it will be "Upload content" by default. This can be changed in the Cms.tsx file if needed

#### `fields`?
Fields is a list of ICmsField, fields is the elements rendered in the form. It is set to optional but nothing will render if you don't include at least one field. A field is of type [ICmsField](CmsBuilder.MD#icmsfield). 

#### `edit`?
Edit is a boolean. If edit is sat to true some words/sentences will change to fit edit instead of the regular create.

#### `submitBtnText`?
submitBtn text is a string and it is the text that is being rendered on the submit button.

#### `onSubmit`?
on submit is of type ``(data: any) => void``. If you want to treat the data by yourself, for example handle post yourself you can use this function to get the data when the user pressed the submit button. The data is formattet for you to a object where the key is the field name and the value is what the user sets it to be.
example: 
```ts
{
    title: "This is a title",
    description: "This is a description"
}
```

#### `submit`?
submit is a object of type [ICmsSubmit](CmsBuilder.MD#icmssubmit). This has to be set for the form to handle the post requests by itself. This only value in submit that isn't optional is the endpoint which the form will post to.

#### `extraValues`?
extraValues is a object of type any. Extra values can be set if you want to pass extra values in the json request on the post method.

For example:
```tsx
extraValues={{
    userId: user.id
}}
```
Now the json request will include userId as an extra value in the request

Useful if you are updating an object so the user doesn't have to set the id of the object he/she is editing themselves.

### ICmsTypes

All the diffrent field types the form supports:
```ts
export type ICmsTypes = "string" | "text" | "boolean" | "number" | "array" | "object" | "select" | "password" | "date";
```

### ICmsField
ICmsField is a field in the cms. This is a component which renders in the form
