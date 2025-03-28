
# jcb-norm

## Installation

```
mkdir test; cd test
npm init es6
npm install jcb-norm
````

## Usage
index.html
```
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>jcb-norm</title>
   </head>
   <body>
      <div class="panel">
         <jcb-norm
            domain='{"inf": 0.4, "sup": 0.6}'
            norm='{"inf": 0.46, "sup": 0.54, "typical": 0.5}'
            value='0.5'
            supColor="#51AEE9"
         ></jcb-norm>
      </div>
      <div class="panel">
         <jcb-norm
            domain='{"inf": 10, "sup": 60}'
            norm='{"inf": 16.9, "sup": 48.4, "typical": 32.7}'
            value='38.6'
            supColor="#51AEE9"
         ></jcb-norm>
      </div>
      <div class="panel">
         <jcb-norm
            domain='{"inf": 20, "sup": 60}'
            norm='{"inf": 0, "sup": 45.0}'
            value='36.4'
            supText="Digestibilité ↘"
         ></jcb-norm>
      </div>
   </body>
</html>

<script type="module">
import 'jcb-norm'
</script>

<style>
:root {
   /* --jcb-norm-font-family: Courier; */
   /* --jcb-norm-font-size: 10px; */
}

.panel {
   width: 600px;
   height: 60px;
   margin-bottom: 20px;
}
</style>
```

## Test
```
npx vite
```
