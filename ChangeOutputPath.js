export class ChangeOutputPath {
    apply(hooks) {
        hooks.emitFile.tap('ChangeOutputPath',(context) => {
            console.log('----changeOutputPath----');
            context.ChangeOutputPath('./dist/lw.js')
        })
    }
}