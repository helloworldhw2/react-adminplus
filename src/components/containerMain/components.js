const files = require.context('../../views/',true,/\.js$/)
const components = []
files.keys().map((key) =>{
  if(key.includes('./Index') || key.includes('./login')){
    return false;
  }
  const comp = {
    path: `/index${key.split('.')[1].toLowerCase()}`,
    conponment: files(key).default
  }
  components.push(comp);
})

export default components