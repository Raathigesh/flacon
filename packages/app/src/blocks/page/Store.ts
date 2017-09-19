import { observable, action, asReference } from "mobx";
import { Block } from "core";
import { DefaultNodeWidget } from "./Component";

export class Store extends Block {
  public page: any;
  @observable public url: string = null;

  constructor(blocks) {
    super(blocks);
    this.name = "Page";
    this.ComponentClass = DefaultNodeWidget;
  }

  @action.bound
  setUrl(url: string) {
    this.url = url;
  }

  public async execute({ browser }: any) {
    this.page = await browser.newPage();
    await this.page.goto(this.url);

    if (this.children[0]) {
      this.children[0].execute({ page: this.page, url: this.url });
    }
  }
}
