echo "Do you want to push or just commit [p/c]: "
read choice
echo "Please write down your comments: "
read comment
function confirm() {
  echo "Are you sure that you are ready to $1 [Y/N]"
  read yn
  if [[ $yn == "y" || $yn == "Y" ]]; then
    if [[ $1 == "commit" ]]; then
      git commit -m "$comment"
      git status
    elif [[ $1 == "push" ]]; then
      git push
    fi
  fi
}
if [[ $choice == "p" || $choice == "P" ]]
then
  git add .
  git status
  confirm "commit"
  confirm "push"
elif [[ $choice == "c" || $choice == "C" ]]
then
  git add .
  git status
  confirm "commit"
fi
read -p "Press Enter to exit"
