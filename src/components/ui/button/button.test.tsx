import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Testing the Button component", () => {

  it("should be the correct display of the button with text", () => {
    const tree = renderer.create(<Button text="Teст" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be the correct display of the button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be the correct display of the locked button", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be the correct button with a loading indication", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should be a correct callback call when the button is clicked", () => {
    const callback = jest.fn();
    render(<Button onClick={callback} />);
    // Находим кнопку
    const button = screen.getByRole("button");
    // Имитируем нажатие на кнопку
    fireEvent.click(button);
    // Проверяем, что колбек был вызван
    expect(callback).toHaveBeenCalled();
  });
});
