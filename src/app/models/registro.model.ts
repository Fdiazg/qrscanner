export class Registro {
  public format: string;
  public content: string;
  public type: string;
  public icon: string;
  public created: Date;

  constructor(format: string, content: string) {
    this.format = format;
    this.content = content;
    this.created = new Date();
    this.determinarTipo();
  }

  private determinarTipo(){

    const inicioTexto = this.content.substring(0,4);

    switch(inicioTexto){
        case 'http':
            this.type = 'http';
            this.icon = 'globe';
            break;
        case 'geo:':
            this.type = 'geo';
            this.icon = 'map-outline';
            break;
        default:
            this.type = 'No reconocido';
            this.icon = 'create';
            break;
    }

  }

}
