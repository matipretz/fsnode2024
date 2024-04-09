document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll("section a");
  for (var i = 0; i < links.length; i++) {
    links[i].setAttribute("target", "_blank");
  }
});

//Simula SPA
document.addEventListener("DOMContentLoaded", function () {
  const views = document.querySelectorAll(".view");
  const viewShow = (id) => {
    views.forEach((view) => (view.style.display = "none"));
    document.getElementById(id).style.display = "block";
  };

  //Enrutador
  document.getElementById("viewlink1").addEventListener("click", function () {
    viewShow("view1");
  });

  document.getElementById("viewlink2").addEventListener("click", function () {
    viewShow("view2");
  });

  document.getElementById("viewlink3").addEventListener("click", function () {
    viewShow("view3");
  });
  document.getElementById("viewlink4").addEventListener("click", function () {
    viewShow("view4");
  });
  document.getElementById("viewlink5").addEventListener("click", function () {
    viewShow("view5");
  });

  viewShow("view1");
});
