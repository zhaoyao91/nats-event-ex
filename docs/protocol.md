# Event Protocol

## Version

1

## Format

JSON

## Schemas

### Event

```
{
  eventId: String,
  data?: Any,
}
```

## Suggestions

For event name (or, message topic), the suggested pattern is:

```
{subject}.{event}.{version}?
```

For example, if a service named book-creator created a book, which is an abstract resource defined in system, 
it might send two events: 

- book-creator.created-book
- book.created