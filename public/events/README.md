# Event photos

Drop photos here and list them on the event in `src/content/site.ts`:

```ts
images: ["/events/antler-01.jpg", "/events/antler-02.jpg"]
```

JPEG straight from a phone is fine — do not pre-convert. Next resizes and
serves AVIF/WebP per browser and lazy-loads them. Keep sources under ~2 MB
and no wider than 2560px.

Photos of other people: make sure you are happy publishing them, and that they
would be too.
